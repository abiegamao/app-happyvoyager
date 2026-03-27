import { NextRequest, NextResponse } from "next/server";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

// GET /api/playbook/progress?playbook_slug=spain-dnv
export async function GET(request: NextRequest) {
  const customer = await getCustomerFromRequest(request);
  if (!customer) {
    return NextResponse.json({ completedLessonIds: [] });
  }

  const playbookSlug = request.nextUrl.searchParams.get("playbook_slug");
  if (!playbookSlug) {
    return NextResponse.json({ completedLessonIds: [] });
  }

  const { data: playbook } = await supabaseAdmin
    .from("playbooks")
    .select("id")
    .eq("slug", playbookSlug)
    .maybeSingle();

  if (!playbook) {
    return NextResponse.json({ completedLessonIds: [] });
  }

  const { data: progress } = await supabaseAdmin
    .from("playbook_lesson_progress")
    .select("lesson_id")
    .eq("customer_id", customer.id)
    .eq("playbook_id", playbook.id);

  const completedLessonIds = (progress ?? []).map((r: { lesson_id: string }) => r.lesson_id);
  return NextResponse.json({ completedLessonIds });
}

// POST /api/playbook/progress
// Body: { playbook_slug, lesson_id, completed: boolean }
export async function POST(request: NextRequest) {
  const customer = await getCustomerFromRequest(request);
  if (!customer) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { playbook_slug?: string; lesson_id?: string; completed?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { playbook_slug, lesson_id, completed } = body;

  if (!playbook_slug || !lesson_id || completed === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data: playbook } = await supabaseAdmin
    .from("playbooks")
    .select("id")
    .eq("slug", playbook_slug)
    .maybeSingle();

  if (!playbook) {
    return NextResponse.json({ error: "Playbook not found" }, { status: 404 });
  }

  if (completed) {
    await supabaseAdmin
      .from("playbook_lesson_progress")
      .upsert(
        {
          customer_id: customer.id,
          playbook_id: playbook.id,
          lesson_id,
        },
        { onConflict: "customer_id,playbook_id,lesson_id" }
      );
  } else {
    await supabaseAdmin
      .from("playbook_lesson_progress")
      .delete()
      .eq("customer_id", customer.id)
      .eq("playbook_id", playbook.id)
      .eq("lesson_id", lesson_id);
  }

  return NextResponse.json({ success: true, lesson_id, completed });
}
