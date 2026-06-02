/**
 * @file main.js
 * @description オープニング演出のシークエンス管理およびIntersection Observerによるコンテンツ制御
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const fadeTargets = document.querySelectorAll('#works, #about, #skills, .work-card');
    
    // 1. 各要素へ初期状態を示すCSSクラスを一括付与
    fadeTargets.forEach(target => {
        target.classList.add('js-fade-in');
    });

    // 2. オープニング演出のタイマー制御（1.4秒後に中央画面をフェードアウト）
    setTimeout(() => {
        body.classList.add('is-loaded');
        
        // メインコンテンツの監視を開始（オープニング画面が消えるタイミングと同期）
        startIntersectionObserver();
    }, 1400);

    // 3. スクロール監視の関数化
    function startIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-5% 0px',
            threshold: 0
        };

        const intersectionCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(intersectionCallback, observerOptions);
        fadeTargets.forEach(target => observer.observe(target));
    }

});
