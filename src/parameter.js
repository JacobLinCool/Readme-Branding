const default_parameters = {
    title: "GitHub Readme Branding",
    text: "Hello Everyone!",
    background: "#4F46E5",
    color: "#B4FFDA",
    width: 1000,
    height: 550,
    border: 0,
    radius: 8,
    animations: ["text_swing", "skill_swing"],
    skills: [],
    custom: false,
    inject: false,
};

async function parse_parameters(search_params) {
    let user = "JacobLinCool";
    if (search_params && search_params.get("user")) user = search_params.get("user");

    const config = await fetch(`https://raw.githubusercontent.com/${user}/${user}/main/branding.config.json?t=${Date.now()}`)
        .then((r) => r.json())
        .catch((err) => {
            console.error(err);
            return {
                title: user,
            };
        });

    let final = Object.assign(
        {},
        default_parameters,
        {
            title: search_params.get("title") || default_parameters.title,
            text: search_params.get("text") || default_parameters.text,
            background: search_params.get("background") || default_parameters.background,
            color: search_params.get("color") || default_parameters.color,
            width: +search_params.get("width") || default_parameters.width,
            height: +search_params.get("height") || default_parameters.height,
            skills: (search_params.get("skills") || "").split(","),
            radius: +search_params.get("radius") || default_parameters.radius,
        },
        config,
        { user: user }
    );
    console.log(`[parse_parameters]`, final);
    return final;
}

exports.parse_parameters = parse_parameters;
