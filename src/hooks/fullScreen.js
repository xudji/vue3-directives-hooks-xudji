import { ref, onMounted, onUnmounted } from 'vue';

const defaultOptions = {
    onFull: function () { },
    onExitFull: function () { },
};

const useFullscreen = (target, options) => {
    const fullScreenElement = !!document.fullscreenElement;
    const isFullscreen = ref(fullScreenElement);

    const { onFull, onExitFull } = { ...defaultOptions, ...options };

    let el = document.body;

    const getEl = () => {
        if (typeof target === 'function') {
            return target();
        }
        return target && target.value ? target.value : target;
    };

    const handler = () => {
        if (isFullscreen.value) {
            onFull();
        } else {
            onExitFull();
        }
    };

    onMounted(() => {
        el = getEl() || el;
        el.addEventListener('fullscreenchange', handler);
    });

    onUnmounted(() => {
        el.removeEventListener('fullscreenchange', handler);
    });

    const actions = {
        setFull: () => {
            if (isFullscreen.value) return;
            el.requestFullscreen();
            isFullscreen.value = true;
        },
        exitFull: () => {
            if (!isFullscreen.value) return;
            document.exitFullscreen();
            isFullscreen.value = false;
        },
        toggle: () => {
            isFullscreen.value ? actions.exitFull() : actions.setFull();
        },
    };

    return [isFullscreen, actions];
};

export default useFullscreen;
