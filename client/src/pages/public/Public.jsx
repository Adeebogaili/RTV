import React, { useContext} from 'react'
import PublicIssues from '../../components/PublicIssue/PublicIssues'
import { IssuesContext } from '../../context/IssuesProvider'
import "./public.css"


export default function Public(){

  const {
    publicIssues,
  } = useContext(IssuesContext)

  return (
    <div className="public">
      <PublicIssues publicIssues={publicIssues}/>
    </div>
  )
}