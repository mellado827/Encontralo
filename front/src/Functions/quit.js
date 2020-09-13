function quit() {
    window.onbeforeunload = function () {
        return "";
    };
}

export default quit
