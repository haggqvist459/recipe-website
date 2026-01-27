import { supabase } from '@/supabase/client.ts';
import { DB_COLUMNS } from '@/utils/constants';
import { UserRoleType } from '@/types';


export const selectUserRole = async (uid: string): Promise<UserRoleType> => {

  const { data } = await supabase
    .from('user_role')
    .select(`${DB_COLUMNS.USER_ROLE.ROLE}, ${DB_COLUMNS.USER_ROLE.RANK}`)
    .eq(DB_COLUMNS.USER_ROLE.USER_ID, uid)
    .single()
    .throwOnError()

  return data

}