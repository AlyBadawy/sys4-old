import React from 'react';
import Moment from 'react-moment';

type TimeWrapperProps = {
  date: Date;
};

export const TimeWrapper = ({ date }: TimeWrapperProps) => {
  return (
    <Moment format='DD MMMM YY - hh:mm A' titleFormat='YYYY/MM/DD hh:mm:ss'>
      {date}
    </Moment>
  );
};
