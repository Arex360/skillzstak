import {Button} from '@mantine/core'
export default function Btn({classname,onClick}){
    return(
        <div className={classname} onClick={onClick}>
            <Button/>
        </div>
    )
}