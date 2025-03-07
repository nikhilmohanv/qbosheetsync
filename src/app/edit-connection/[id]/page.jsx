"use client";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";

export default function EditConnection() {
  const { user, loading } = useUser();
  const { id } = useParams();

  if (loading) return <p>Loading...</p>;

  const quickbooksAuthUrl = `${process.env.NEXT_PUBLIC_QUICKBOOKS_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID}&response_type=code&scope=${process.env.NEXT_PUBLIC_QUICKBOOKS_SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_QUICKBOOKS_REDIRECT_URI}&state=${user.id}`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPES}&access_type=offline&prompt=consent`;

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="step-1">
          <AccordionTrigger>Step 1</AccordionTrigger>
          <AccordionContent>
            <Button asChild>
              <Link href={quickbooksAuthUrl}>connect with quickbook</Link>
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="step-2">
          <AccordionTrigger>Step 2</AccordionTrigger>
          <AccordionContent>COnnect with google sheet</AccordionContent>
        </AccordionItem>
        <AccordionItem value="step-3">
          <AccordionTrigger>Step 3</AccordionTrigger>
          <AccordionContent>
            <Button asChild>
              <Link href={"fa"}>Copy template</Link>
            </Button>
            <br />
            <Label>Sheet id</Label>
            <Input type={"text"} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
