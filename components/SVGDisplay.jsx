function SVGDisplay({ svg }) {
    return (
        <div
            className="SVG-container"
            dangerouslySetInnerHTML={{
                __html: svg,
            }}
        ></div>
    );
}

export default SVGDisplay;
