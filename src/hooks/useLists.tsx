
import { ITodoResponse } from "../models"
import axios from 'axios'
import { useState } from "react"
import { AUTHOR_ID, BASE_URL } from "../constants/app"
import { useDispatch } from "react-redux"
import { setList } from "../store/slices/lists"


export const useList = () => {
  const [todos, setTodos] = useState<ITodoResponse[]>([])
  const dispacth = useDispatch();
  const refetch = () => {
    axios.get(`${BASE_URL}?id_author=${AUTHOR_ID}`)
      .then(res => {
        const data = res.data
        setTodos((data as any).data.map((todo: ITodoResponse): ITodoResponse => ({
          id: todo.id,
          status: todo.status,
          description: todo.description,
          finish_at: new Date(todo.finish_at).toISOString().slice(0, 10)
        }))
        )
      })
  }

  dispacth(setList(todos));
  return { todos, refetch }
}