import { ClickAwayListener } from "@material-ui/core";
import { useParams } from "react-router";

export default function(){
  let {id} = useParams();
  return<p> {id} </p>;
  
}