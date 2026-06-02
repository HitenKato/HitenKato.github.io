/**
 * @file main.js
 * @description Intersection Observerによるコンテンツの滑らかなフェードイン制御
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const fadeTargets = document.querySelectorAll('#works, #about, #skills, .work-card');
    
    // 各要素へ初期状態を示すCSSクラスを一括付与
    fadeTargets.forEach(target => {
        target.classList.add('js-fade-in');
    });

    // スクロール監視のオプション設定
    const observerOptions = {
        root: null,
        rootMargin: '-5% 0px',
        threshold: 0
    };

    // 交差検知時のコールバック関数
    const intersectionCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    // インスタンスの生成と監視の開始
    const observer = new IntersectionObserver(intersectionCallback, observerOptions);
    fadeTargets.forEach(target => observer.observe(target));

});
