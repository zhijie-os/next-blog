type ProjectProps = {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    venue?: string;
    date?: string;
}

const ProjectData: ProjectProps[] = [
    {
        title: "RealityCanvas",
        description: "Mobile AR sketching tool for creating dynamic scribble animations that respond to real-world motion and object movement.",
        imageUrl: "/teaser/reality-canvas.gif",
        link: "https://www.youtube.com/watch?v=UXKhkd3Briw&t=80s",
        venue: "UIST 2023",
        date: "2023-10",
    },
    {
        title: "RealityEffects",
        description: "Desktop authoring interface for editing and augmenting 3D volumetric videos with object-centric annotations and visual effects.",
        imageUrl: "/teaser/RealityEffects.gif",
        link: "https://www.youtube.com/watch?v=5x45I-eXqBk",
        venue: "DIS 2024",
        date: "2024-07",
    },
    {
        title: "Knowd Board",
        description: "Web tool enabling organizations with programmable knowledge infrastructure for automated information sharing and insights discovery.",
        imageUrl: "/teaser/knowd-board.gif",
        link: "https://app.knowd.ai",
        venue: "Side Project",
        date: "2023",
    }
]

export {ProjectData}
export type {ProjectProps}
