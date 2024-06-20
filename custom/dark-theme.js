/**
 * 监听系统主题
 * @type {MediaQueryList}
 */
var OSTheme = window.matchMedia('(prefers-color-scheme: dark)');
OSTheme.addListener(e => {
    if (document.documentElement.getAttribute('data-theme') === 'auto') {
        ThemeChange('auto');
    }
})
var getSwitch = (num) => {return document.querySelector(`#start > aside > div > footer > div > a:nth-child(${num})`)}
/**
 * 修改博客主题
 * @param theme 亮为light,暗为dark,自动为auto
 * @param init 是否是初始化
 * @constructor document.querySelector("#start > aside > div > footer > div > a:nth-child(5)")
 */
var ThemeChange = (theme, init = false) => {
    // 切换主题模式，light -> dark -> auto -> light
    // const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light' || (theme === 'auto' && !OSTheme.matches)) {
        // document.querySelector("html").id = "ZYLight";
        document.documentElement.setAttribute('data-theme', init? 'light':'auto');
        getSwitch(5).style.filter = 'grayscale(0%)';
        getSwitch(4).style.filter = 'grayscale(100%)';
    } else {
        document.documentElement.setAttribute('data-theme', init?'dark':'light');
        getSwitch(4).style.filter = 'grayscale(0%)';
        getSwitch(5).style.filter = 'grayscale(100%)';
    }
    if (theme === 'auto') {
        document.documentElement.setAttribute('data-theme', init?OSTheme.matches?'dark':'light':'dark');
        getSwitch(6).style.filter = 'grayscale(0%)';
    } else {
        getSwitch(6).style.filter = 'grayscale(100%)';
    }
    init ? console.log("钟意祝你有个美好的一天!") : switchTheme();
}
/**
 * 初始化博客主题
 */
ThemeChange(window.localStorage.getItem('Stellar.theme'), true);
getSwitch(1).style.filter = 'grayscale(0%)';
getSwitch(2).style.filter = 'grayscale(0%)';
getSwitch(3).style.filter = 'grayscale(0%)';
