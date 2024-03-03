import { useKeyPress } from "ahooks"
import { useDispatch } from "react-redux"
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from "../store/componentsReducer"
import { ActionCreators as UndoActionCreators } from "redux-undo"

//判断activeElem是否合法
function isActiveElementValid() {
  const activeElem = document.activeElement
  // //没有增加 dnd-kie前
  // if (activeElem === document.body) return true //光标没有focus到Input

  //增加了dnd-kie之后
  if (activeElem === document.body) return true //光标没有focus到Input
  if (activeElem?.matches('div[role="button"]')) return true
  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  //删除组件
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  //复制
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })
  //粘贴
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })
  //选中上一个
  useKeyPress("uparrow", () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  //选中下一个
  useKeyPress("downarrow", () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
  //撤销重做
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true, //严格匹配
    }
  )
  useKeyPress(
    ["ctrl.shift.z", "meta.shift.z"],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.redo())
    },
    {
      exactMatch: true, //严格匹配
    }
  )
}

export default useBindCanvasKeyPress
