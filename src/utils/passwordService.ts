import { supabase } from './supabaseClient';

export const updateUserPassword = async (newPassword: string): Promise<void> => {
  console.log('🔄 Starting password change process...');
  
  // Update password in Supabase Auth
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (updateError) throw updateError;
  console.log('✅ Supabase Auth password updated successfully');

  // Update password_hash in admin_users table to indicate password has been changed
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session?.user?.email) {
    throw new Error('Nema aktivne sesije');
  }

  console.log('📧 User email:', sessionData.session.user.email);

  const { error: dbError } = await supabase
    .from('admin_users')
    .update({ 
      password_hash: 'password_set_by_user',
      updated_at: new Date().toISOString()
    })
    .eq('email', sessionData.session.user.email);

  if (dbError) {
    console.error('❌ Error updating admin user record:', dbError);
    throw new Error('Greška pri ažuriranju korisničkih podataka');
  }
  console.log('✅ Admin user record updated successfully');

  // Verify the update was successful
  const { data: verifyData, error: verifyError } = await supabase
    .from('admin_users')
    .select('password_hash')
    .eq('email', sessionData.session.user.email)
    .single();

  if (verifyError || verifyData?.password_hash !== 'password_set_by_user') {
    console.error('❌ Password hash verification failed:', verifyError);
    console.error('❌ Expected: password_set_by_user, Got:', verifyData?.password_hash);
    throw new Error('Greška pri verifikaciji promjene lozinke');
  }
  console.log('✅ Password hash verification successful');
  console.log('🎉 Password change completed successfully');
}; 