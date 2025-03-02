
import * as React from 'react';

interface EmailTemplateProps {
    message11: string;
  }

 const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    message11,
  }) => (
    <div>
      <h1>Welcome, {message11}!</h1>
    </div>
  );

  export default EmailTemplate