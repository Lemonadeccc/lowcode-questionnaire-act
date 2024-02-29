import React, { FC } from "react"
import { Typography, Input } from "antd"
import { QuestionInputPropsType, QuestionTitleDefaultProps } from "./interface"

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionTitleDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export default QuestionInput
