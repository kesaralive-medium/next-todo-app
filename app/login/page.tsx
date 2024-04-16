"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {LockClosedIcon} from "@radix-ui/react-icons";

export default function Page() {

    return (
        <div className="flex justify-center items-center w-full h-screen pb-20">
            <div className="flex flex-col items-center">
                <img src="/download.png" alt="logo"/>
                <Link href="http://localhost/oauth2/start?rd=http%3A%2F%2Flocalhost%3A3000%2F">
                    <Button className="flex justify-center items-center"><LockClosedIcon
                        className="w-5 h-5 mr-2"/> Login with Google</Button>
                </Link>
            </div>
        </div>
    )
}