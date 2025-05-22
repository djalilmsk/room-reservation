import { Button } from "@/components/ui/button";
import { buttonLabel } from "@/components/ui/button-label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Section, SectionTitle } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { customFetch } from "@/utils";
import { defaults } from "@/utils/format/toast-styles";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { Send } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ReviewsList from "./ReviewsList";
import ReviewForm from "./forms/ReviewForm";

function RoomReview() {
  return (
    <Section>
      <SectionTitle>Room Reviews</SectionTitle>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card h-fit rounded-lg p-5 not-dark:shadow-sm">
          <ReviewForm />
        </div>

        <ReviewsList />
      </div>
    </Section>
  );
}

export default RoomReview;
