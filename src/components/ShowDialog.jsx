import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'


export default function ShowDialog({detail, func,children}) {
    console.log(children);
  return (
    <div>
        
        <AlertDialog>
        <AlertDialogTrigger asChild>
                {children}
            
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {detail}
                    </AlertDialogDescription>
            </AlertDialogHeader>
            
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={func}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>

        </AlertDialog>
    </div>
    
  )
}
