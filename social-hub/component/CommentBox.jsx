'use client'
import { Button, Flex, Form, Input, message, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'

const CommentBox = (post) => {
    const [form] = useForm();
    console.log("comment box section")

    const onfinsih = (value)=> {

        // call the db for save the comment.
        message.success("the comment has been added successfully");
        form.resetFields();
    }

    const onFailed = () => {

        message.error("something went wrong while adding your comment, please try again!!")
    }

  return (
    <Flex align='center' justify='center'>
        <Form 
            form={form}
            name='commentForm'
            layout='vertical'
            onFinish={onfinsih}
            onFinishFailed={onFailed}
        >
        
        <Flex vertical align='start-flex' justify='start-flex'>
        <Form.Item
                label="comment"
                name="comment"
                rules={[{required: true, message: "write your comment"}]}>
            </Form.Item>

            <Input.TextArea placeholder='Write your comment' rows={4}/>

            <Form.Item>
                <Button>
                    <Typography className="typoBody1">Publish</Typography>
                </Button>
            </Form.Item>
        </Flex>
        </Form>
    </Flex>
  )
}

export default CommentBox
