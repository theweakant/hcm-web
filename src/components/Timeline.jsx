import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import Badge from './ui/Badge';

const Timeline = ({ events }) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-200 via-red-300 to-red-200"></div>

      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative flex items-start space-x-6"
          >
            {/* Timeline dot */}
            <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center relative z-10 shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <Card className="flex-1 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent padding="default">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="h-4 w-4 text-gray-500" aria-hidden="true" />
                  <Badge variant="primary" size="sm">
                    {event.date}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg mb-3">
                  {event.event}
                </CardTitle>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
