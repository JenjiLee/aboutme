
CREATE TABLE public.guestbook_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nickname TEXT NOT NULL,
  message TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.guestbook_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert a message"
  ON public.guestbook_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read public messages"
  ON public.guestbook_messages
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);
