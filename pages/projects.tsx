import Project from "../components/project";
import Layout from "../components/layout";

type Project = {
  title: string;
  description: string;
  imageUrl?: string;
  youtubeId?: string;
  link: string;
}

const ProjectData: Project[] = [
  {
    title: "RealityCanvas",
    description: "ACM CHI 2023 submission",
    youtubeId: "3P1uGJaSVfg",
    link: "/"
  },
  {
    title: "RealityCanvas",
    description: "This will be a very very very long long long title",
    imageUrl: "/images/avatar.png",
    link: "/"
  },
  {
    title: "RealityCanvas",
    description: "This will be a very very very long long long title",
    imageUrl: "/images/avatar.png",
    link: "/"
  },
  {
    title: "RealityCanvas",
    description: "This will be a very very very long long long title",
    imageUrl: "/images/avatar.png",
    link: "/"
  },
  {
    title: "RealityCanvas",
    description: "This will be a very very very long long long title",
    imageUrl: "/images/avatar.png",
    link: "/"
  },
]

export default function Projects() {
  return (
    <Layout home={false}>
      <div className="divide-y divide-gray-200 dark-divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading- tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-4xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Welcome to my project gallery, here I showcase some of my projects on my way to become a 100X developer.
          </p>
        </div>

        {/* map each project data to a project card */}
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {ProjectData.map((p) => (
              <Project
                key={p.title}
                title={p.title}
                description={p.description}
                link={p.link}
                youtubeId={p.youtubeId}
                imageUrl={p.imageUrl}
              ></Project>
            ))}
          </div>
        </div>

      </div>
    </Layout>

  )
}