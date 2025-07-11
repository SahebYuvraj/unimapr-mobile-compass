-- Remove the email domain restriction trigger that blocks non-ANU signups
DROP TRIGGER IF EXISTS restrict_email_domains_trigger ON auth.users;

-- Remove the restriction function
DROP FUNCTION IF EXISTS public.restrict_email_domains();

-- Update the handle_new_user function to properly handle both ANU and non-ANU users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, is_university_user)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    CASE WHEN NEW.email ~* '@anu\.edu\.au$' THEN TRUE ELSE FALSE END
  );
  RETURN NEW;
END;
$$;