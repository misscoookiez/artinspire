import InspirePage from "../inspire/page";

export const metadata = {
  title: "Biežāk uzdotie jautājumi | Art Studio Inspire",
  description: "Atbildes par Art Studio Inspire nodarbībām, rezervācijām, materiāliem un studiju Rīgā.",
};

export default function QuestionsPage() {
  return <InspirePage page="questions" />;
}
