const text_swing = `
@keyframes title-swing {
    0% { transform: rotate(2deg); }
    100% { transform: rotate(-2deg); }
}
@keyframes subtitle-swing {
    0% { transform: rotate(-2deg); }
    100% { transform: rotate(2deg); }
}
#title {
    animation: title-swing ease-in-out 2s infinite alternate;
}
#subtitle {
    animation: subtitle-swing ease-in-out 2s infinite alternate;
}`;
const skill_swing = `
@keyframes swing1 {
    0% { transform: rotate(4deg); }
    100% { transform: rotate(-4deg); }
}
@keyframes swing2 {
    0% { transform: rotate(-4deg); }
    100% { transform: rotate(4deg); }
}
.skill-wrap:nth-child(odd) .skill {
    animation: swing1 ease-in-out 3s infinite alternate;
}
.skill-wrap:nth-child(even) .skill {
    animation: swing2 ease-in-out 3s infinite alternate;
}`;
const bg_rotate = `
@keyframes bg_rotate {
    0% { filter: hue-rotate(90deg); }
    100% { filter: hue-rotate(-90deg); }
}
#background {
    animation: bg_rotate linear 6s infinite alternate;
}`;

exports[""] = "";
exports.text_swing = text_swing;
exports.skill_swing = skill_swing;
exports.bg_rotate = bg_rotate;
