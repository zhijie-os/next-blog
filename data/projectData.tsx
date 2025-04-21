type ProjectProps = {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

const ProjectData: ProjectProps[] = [
    {
        title: "RealityCanvas",
        description: "Mobile AR sketching tool for creating dynamic scribble animations that respond to real-world motion and object movement. Offers a variety of animation techniques for expressive and versatile AR-based sketches. Designed to facilitate creation of AR-based sketches and enhance user experience.",
        imageUrl: "/teaser/reality-canvas.gif",
        link: "https://www.youtube.com/watch?v=UXKhkd3Briw&t=80s"
    },
    {
        title: "RealityEffects",
        description: "Desktop authoring interface designed for editing and augmenting 3D volumetric videos with object-centric annotations and visual effects",
        imageUrl: "/teaser/RealityEffects.gif",
        link: "https://www.youtube.com/watch?v=5x45I-eXqBk"
    },
    {
        title: "Knowd Board",
        description: "Web tool which enables organizations with programmable knowledge infrastructure for automated information sharing, insights discovery, and seamless knowledge flows.",
        imageUrl: "/teaser/knowd-board.gif",
        link: "app.knowd.ai"
    }
]

export {ProjectData}
export type {ProjectProps}