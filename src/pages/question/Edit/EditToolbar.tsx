import React, { FC } from "react"
import { Space, Button, Tooltip } from "antd"
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from "@ant-design/icons"
import { useDispatch } from "react-redux"
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from "../../../store/componentsReducer"
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo"

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentsInfo()
  const { isLocked } = selectedComponent || {}

  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }
  function copy() {
    dispatch(copySelectedComponent())
  }
  function paste() {
    dispatch(pasteCopiedComponent())
  }
  //TODO 上移/下移，撤销/重做

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? "primary" : "default"}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
