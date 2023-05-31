/**
 * 拖拽 dialog 的函数，目前支持 element-plus
 */
export default function dialogDrag() {
    /**
     * 设置拖拽事件
     * @param container 大容器，比如蒙版。
     * @param dialog 被拖拽的窗口
     * @param dialogTitle 拖拽的标题
     * @param width 宽度比例
     */
    const setDialog = (container, dialog, dialogTitle, width) => {
        const oldCursor = dialogTitle.style.cursor
        // 可视窗口的宽度
        const clientWidth = document.documentElement.clientWidth
        // 可视窗口的高度
        const clientHeight = document.documentElement.clientHeight
        // 根据百分数计算宽度
        const tmpWidth = clientWidth * (100 - width) / 200
        // 默认宽度和高度
        const domset = {
            x: tmpWidth,
            y: clientHeight * 15 / 100 // 根据 15vh 计算
        }
        // 查看dialog 当前的宽度和高低
        if (dialog.style.marginLeft === '') {
            dialog.style.marginLeft = domset.x + 'px'
        } else {
            domset.x = dialog.style.marginLeft.replace('px', '') * 1
        }
        if (dialog.style.marginTop === '') {
            dialog.style.marginTop = domset.y + 'px'
        } else {
            domset.y = dialog.style.marginTop.replace('px', '') * 1
        }
        // 记录拖拽开始的光标坐标，0 表示没有拖拽
        const start = { x: 0, y: 0 }
        // 移动中记录偏移量
        const move = { x: 0, y: 0 }
        // 经过时改变鼠标指针形状
        dialogTitle.onmouseover = () => {
            dialogTitle.style.cursor = 'move' // 改变光标形状
        }
        // 鼠标按下，开始拖拽
        dialogTitle.onmousedown = (e) => {
            start.x = e.clientX
            start.y = e.clientY
            dialogTitle.style.cursor = 'move' // 改变光标形状
        }
        // 鼠标移动，实时跟踪 dialog
        container.onmousemove = (e) => {
            if (start.x === 0) { // 不是拖拽状态
                return
            }
            move.x = e.clientX - start.x
            move.y = e.clientY - start.y
            // 初始位置 + 拖拽距离
            dialog.style.marginLeft = (domset.x + move.x) + 'px'
            dialog.style.marginTop = (domset.y + move.y) + 'px'
        }

        // 鼠标抬起，结束拖拽
        container.onmouseup = (e) => {
            // alert(start.x)
            if (start.x === 0) { // 不是拖拽状态
                return
            }
            move.x = e.clientX - start.x
            move.y = e.clientY - start.y
            // 记录新坐标，作为下次拖拽的初始位置
            domset.x += move.x
            domset.y += move.y
            dialogTitle.style.cursor = oldCursor
            dialog.style.marginLeft = domset.x + 'px'
            dialog.style.marginTop = domset.y + 'px'
            // 结束拖拽
            start.x = 0

        }
    }
    const unload = (container, dialogTitle) => {
        dialogTitle.onmouseover = null
        dialogTitle.onmousedown = null
        container.onmousemove = null
        container.onmouseup = null
    }
    return {
        setDialog, // 设置
        unload // 卸载，移除事件
    }
}