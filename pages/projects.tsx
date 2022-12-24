import Project from "../components/project";

export default function Projects() {
  return (
    <div className="flex flex-col space-y-4">
      <Project
        title="RealityCanvas"
        description="ACM CHI 2023 submission"
        youtubeId="3P1uGJaSVfg"
      ></Project>

      <Project
        title="RealityCanvas"
        description="ACM CHI 2023 submission"
        imageUrl="/images/avatar.png"
      ></Project>
    </div>

  )
}