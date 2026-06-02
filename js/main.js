/**
 * @file main.js
 * @description 画面スクロールに応じたコンテンツのフェードイン制御（Intersection Observer APIの実装）
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // アニメーションを適用するターゲット（各セクション、およびWorks内のカード群）を抽出
    const fadeTargets = document.querySelectorAll('#works, #about, #skills, .work-card');
    
    // 各要素へ初期状態を示すCSSクラスを一括付与
    fadeTargets.forEach(target => {
        target.classList.add('js-fade-in');
    });

    // オブザーバーのオプション設定（閾値と発火タイミングの定義）
    const observerOptions = {
        root: null,            // ビューポートを基準に監視
        rootMargin: '-8% 0px', // 画面上下の内側8pxに入った瞬間に発火させる（誤作動防止）
        threshold: 0           // 1ピクセルでもターゲットが進入したら発火
    };

    // 交差検知時のコールバック関数
    const intersectionCallback = (entries, observer) => {
        entries.forEach(entry => {
            // 要素が画面内に入った場合
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 一度表示された要素は監視を解除し、スクロール毎の負荷を軽減（パフォーマンス最適化）
                observer.unobserve(entry.target);
            }
        });
    };

    // インスタンスの生成と監視の開始
    const observer = new IntersectionObserver(intersectionCallback, observerOptions);
    fadeTargets.forEach(target => observer.observe(target));

});
