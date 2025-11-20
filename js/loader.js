window.onload = function () {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const content = document.querySelector('.content');

    // Hide loader
    loaderWrapper.style.opacity = "0";
    loaderWrapper.style.transition = "0.4s ease";

    setTimeout(() => {
        loaderWrapper.style.display = "none";
        content.style.display = "block";
    }, 400);
}