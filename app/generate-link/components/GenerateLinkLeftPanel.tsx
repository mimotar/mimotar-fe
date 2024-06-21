import Steps from "./Steps";

interface GenerateLinkLeftPanelType {
  title: string;
  subtitle: string;
  stage: number;
}
export default function GenerateLinkLeftPanel({
  title,
  subtitle,
  stage,
}: GenerateLinkLeftPanelType) {
  return (
    <section className=" flex flex-col">
      {/* <Steps title={title} subtitle={subtitle} stage={stage} />
      <Steps title={title} subtitle={subtitle} stage={stage} /> */}
    </section>
  );
}
