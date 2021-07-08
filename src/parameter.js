const default_parameters = {
    title: "GitHub Readme Branding",
    text: "Hello Everyone!",
    background: "#4F46E5",
    color: "#B4FFDA",
    width: 1000,
    height: 550,
    border: 0,
    radius: 8,
    animations: ["swing", "bg_rotate"],
    skills: [],
    custom: false,
};

async function parse_parameters(search_params) {
    let user = "JacobLinCool";
    if (search_params && search_params.get("user")) user = search_params.get("user");

    const config = await fetch(`https://raw.githubusercontent.com/${user}/${user}/main/branding.config.json?t=${Date.now()}`)
        .then((r) => r.json())
        .catch((err) => {
            console.error(err);
            return {};
        });

    let final = Object.assign({}, default_parameters, config, { user: user });
    console.log(`[parse_parameters]`, final);
    return final;
}

exports.parse_parameters = parse_parameters;
