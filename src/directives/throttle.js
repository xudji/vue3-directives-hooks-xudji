export default {
    mounted(el, binding) {
        if (typeof binding.value.fn !== 'function' || !binding.value.event) return;
        let lastTime = null;
        const delay = binding.value.delay || 200;
        el.handler = function () {
            const now = Date.now();
            if (!lastTime || now - lastTime >= delay) {
                binding.value.fn.apply(this, arguments);
                lastTime = now;
            }
        };
        el.addEventListener(binding.value.event, el.handler);
    },
    beforeUnmount(el, binding) {
        el.removeEventListener(binding.value.event, el.handler);
    }
}