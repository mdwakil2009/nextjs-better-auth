import React, { Suspense } from 'react';
import ResetPasswordForm from '../reset-password-form/page';

const ResetPasswordPage = () => {
     return (
          <div>
               <h3>Reset password</h3>
               <Suspense fallback="loading..">
                    <ResetPasswordForm></ResetPasswordForm>
               </Suspense>
          </div>
     );
};

export default ResetPasswordPage;