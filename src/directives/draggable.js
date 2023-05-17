import dialogDrag from './_dialog-drag'

import { watch } from 'vue'

const _dialogDrag = {
    // mounted 
    mounted(el, binding) {
        // 监听 dialog 是否显示的状态
        watch(binding.value, () => {
            // dialog 不可见，退出
            if (!binding.value.visible) return
            // 寻找 el-dialog 组件
            const container = el.firstElementChild.firstElementChild
            // 已经设置拖拽事件，退出
            if (container.onmousemove) return

            // 等待 DOM 渲染完毕
            setTimeout(() => {
                // 拖拽的 “句柄”
                const _dialogTitle = el.getElementsByClassName('el-dialog__header')

                if (_dialogTitle.length === 0) {
                    // 还没有渲染完毕，或则其他原因
                    console.warn('没有找到要拖拽的 el-dialog', el)
                } else {
                    const { setDialog } = dialogDrag()
                    const dialogTitle = _dialogTitle[0]
                    // 弹窗
                    const dialog = el.firstElementChild.firstElementChild.firstElementChild
                    // 通过 css 寻找 el-dialog 设置的宽度
                    const arr = dialog.style.cssText.split(';')
                    const width = arr[0].replace('%', '').replace('--el-dialog-width:', '') //
                    // 设置 el-dialog 组件、弹窗、句柄、宽度
                    setDialog(container, dialog, dialogTitle, width)
                }
            }, 300)
        })
    },

    // 移除事件
    unmounted(el, binding) {
        setTimeout(() => {
            // 拖拽的div
            const _dialogTitle = el.getElementsByClassName('el-dialog__header')

            if (_dialogTitle.length === 0) {
                console.warn('没有找到要拖拽的dialog', el)
            } else {
                // el-dialog 组件
                const container = el.firstElementChild.firstElementChild
                const dialogTitle = _dialogTitle[0]
                const { unload } = dialogDrag()
                // 设置
                unload(container, dialogTitle)
            }
        }, 500)
    }
}


export default _dialogDrag

