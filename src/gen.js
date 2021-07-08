const img = require("./image");
const animation = require("./animation");

async function gne_svg(parameters) {
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 ${parameters.width} ${parameters.height}" fill="none">
    <style>
        * {
            font-family: sans-serif;
        }
        #background {
            z-index: 1;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            fill: ${parameters.background};
        }
        #title-wrap {
            transform: translate(${parameters.width * 0.5}px, ${parameters.height * 0.3}px);
        }
        #title {
            text-anchor: middle;
            alignment-baseline: middle;
            font-size: 3.6rem;
            font-weight: bold;
            fill: ${parameters.color};
        }
        #subtitle-wrap {
            transform: translate(${parameters.width * 0.5}px, ${parameters.height * 0.45}px);
        }
        #subtitle {
            text-anchor: middle;
            alignment-baseline: middle;
            font-size: 2.2rem;
            margin: 4px;
            fill: ${parameters.color};
        }
        #skills {
            transform: translate(${parameters.width * 0.5}px, ${parameters.height * 0.65}px);
        }

        ${parameters.animations
            .map((x) => animation[x])
            .filter((x) => !!x)
            .join("\n")}
    </style>
    <style id="custom-styles">
        ${
            parameters.custom
                ? await fetch(`https://raw.githubusercontent.com/${parameters.user}/${parameters.user}/main/branding.css?t=${Date.now()}`).then((r) => r.text())
                : ""
        }
    </style>
    <rect id="background" rx="${parameters.radius}"></rect>
    <g id="title-wrap">
        <text id="title">${parameters.title}</text>
    </g>
    <g id="subtitle-wrap">
        <text id="subtitle">${parameters.text}</text>
    </g>
    <g id="skills">
        ${(() => {
            let skills = [],
                images = [];
            parameters.skills.forEach((skill) => {
                if (img[skill]) {
                    skills.push(skill);
                }
            });
            let size = parameters.width / 15,
                gap = parameters.width / 50;
            let full_width = size * skills.length + gap * (skills.length - 1);
            skills.forEach((skill, i) => {
                let [height, data] = img[skill](size).split("]}{[");
                images.push(
                    `<g class="skill-wrap" style="transform: translate(${(size + gap) * i - full_width / 2}px, -${
                        height / 2
                    }px)"><g id="skill-${skill}" class="skill">${data}</g></g>`
                );
            });
            console.log("Skills", skills);
            return images.join(" ");
        })()}
    </g>
</svg>
`;
}

exports.gne_svg = gne_svg;
