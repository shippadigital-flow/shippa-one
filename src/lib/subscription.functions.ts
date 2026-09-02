import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Subscription } from "@/lib/permissions";

const planSchema = z.enum(["start", "pro"]);
const statusSchema = z.enum(["active", "canceled", "past_due"]);

const updateSchema = z.object({
  plan: planSchema,
  status: statusSchema,
});

type Row = {
  plan: "start" | "pro";
  status: "active" | "canceled" | "past_due";
  started_at: string | null;
  expires_at: string | null;
};

function toSubscription(row: Row): Subscription {
  return {
    plan: row.plan,
    status: row.status,
    startedAt: row.started_at,
    expiresAt: row.expires_at,
  };
}

const SELECT = "plan, status, started_at, expires_at";

/** Retorna a assinatura do usuário autenticado, criando uma Start ativa se não existir. */
export const getMySubscription = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Subscription> => {
    const { supabase, userId } = context;

    const { data, error } = await supabase
      .from("subscriptions")
      .select(SELECT)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (data) return toSubscription(data as Row);

    const { data: created, error: insertError } = await supabase
      .from("subscriptions")
      .insert({ user_id: userId, plan: "start", status: "active" })
      .select(SELECT)
      .single();

    if (insertError) throw new Error(insertError.message);
    return toSubscription(created as Row);
  });

/**
 * Modo de teste: atualiza a assinatura do próprio usuário autenticado.
 * A RLS garante que ninguém altere a assinatura de outra pessoa.
 */
export const updateMySubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => updateSchema.parse(input))
  .handler(async ({ data, context }): Promise<Subscription> => {
    const { supabase, userId } = context;

    const { data: updated, error } = await supabase
      .from("subscriptions")
      .upsert(
        {
          user_id: userId,
          plan: data.plan,
          status: data.status,
        },
        { onConflict: "user_id" },
      )
      .select(SELECT)
      .single();

    if (error) throw new Error(error.message);
    return toSubscription(updated as Row);
  });
