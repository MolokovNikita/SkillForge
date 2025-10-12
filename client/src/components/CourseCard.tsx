import { Clock, Users, Star, Play } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback.tsx';

interface CourseCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: string;
    enrolled: number;
    rating: number;
    progress: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    category: string;
}

const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
};

export function CourseCard({
    title,
    description,
    image,
    duration,
    enrolled,
    rating,
    progress,
    difficulty,
    category
}: CourseCardProps) {
    return (
        <Card className="border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="relative overflow-hidden rounded-t-lg">
                <ImageWithFallback
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                    <Badge className={difficultyColors[difficulty]}>
                        {difficulty}
                    </Badge>
                </div>
                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                        {category}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4">
                <div className="space-y-3">
                    <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{enrolled} enrolled</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{rating}</span>
                        </div>
                    </div>

                    {progress > 0 ? (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium text-gray-900">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                    ) : (
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            <Play className="w-4 h-4 mr-2" />
                            Start Course
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}