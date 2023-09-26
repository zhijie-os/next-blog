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
        title: "Knowd Board",
        description: "Web tool which enables organizations with programmable knowledge infrastructure for automated information sharing, insights discovery, and seamless knowledge flows.",
        imageUrl: "/teaser/knowd-board.gif",
        link: "app.knowd.ai"
    },
    {
        title: "The Witching Knight",
        description: "2D top-down shooting game in JavaFX. Players navigate through levels, defeat enemies, and complete objectives using a variety of weapons and power-ups. Features single-player campaign mode and multiplayer mode. May include boss battles and a leveling system.",
        imageUrl: "/teaser/the-witching-knight.gif",
        link: "https://github.com/zhijie-os/The-Witching-Knight"
    },
]

export {ProjectData}
export type {ProjectProps}