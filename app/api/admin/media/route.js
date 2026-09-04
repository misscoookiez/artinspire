import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const bucket = "site-media";
const maxBytes = 12 * 1024 * 1024;
const extensions = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const safeName = (name) =>
  String(name || "image")
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "image";

export async function POST(request) {
  const auth = await requireOwner(request);
  if (auth.error)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  if (!supabaseAdmin)
    return NextResponse.json(
      { error: "Media storage is not connected." },
      { status: 503 },
    );
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) throw new Error("Choose an image to upload.");
    if (!extensions[file.type])
      throw new Error("Use a JPG, PNG, WebP or GIF image.");
    if (file.size > maxBytes)
      throw new Error("Please keep images below 12 MB.");
    const path = `studio/${new Date().toISOString().slice(0, 10)}/${safeName(file.name)}-${crypto.randomUUID()}.${extensions[file.type]}`;
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, Buffer.from(await file.arrayBuffer()), {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });
    if (error) throw error;
    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, path });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not upload that image." },
      { status: 400 },
    );
  }
}
