import { ERoles } from '@app/common/enums/roles';
import { Types } from 'mongoose';
export interface IUsers {
  _id?: Types.ObjectId;
  role: ERoles;
  email: string;
  first_name: string;
  last_name: string;
  active?: boolean;
  birth_date: string;
  calling_code: string;
  phone: number;
  balance: number;
  platforms: [
    {
      name: string;
      platform_id: string;
    },
  ];
}
