import {ReactNode} from "react";

export const metadata = {
	title: "Edit resume",
	description: 'editing resume'
}

export default function ResumeEditLayout({children}: { children: ReactNode }) {
	return <>{children}</>
}