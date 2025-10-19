import { Clock, Users, Star, Play } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback.tsx';
import styles from './CourseCard.module.css';

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
    Beginner: styles.difficultyBeginner,
    Intermediate: styles.difficultyIntermediate,
    Advanced: styles.difficultyAdvanced
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
        <Card className={styles.courseCard}>
            <div className={styles.imageContainer}>
                <ImageWithFallback
                    src={image}
                    alt={title}
                    className={styles.courseImage}
                />
                <div className={styles.difficultyBadge}>
                    <Badge className={difficultyColors[difficulty]}>
                        {difficulty}
                    </Badge>
                </div>
                <div className={styles.categoryBadge}>
                    <Badge variant="secondary" className={styles.categoryBadge}>
                        {category}
                    </Badge>
                </div>
            </div>

            <CardContent className={styles.cardContent}>
                <div className={styles.content}>
                    <div>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.description}>{description}</p>
                    </div>

                    <div className={styles.metaInfo}>
                        <div className={styles.metaItem}>
                            <Clock className={styles.metaIcon} />
                            <span>{duration}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <Users className={styles.metaIcon} />
                            <span>{enrolled} enrolled</span>
                        </div>
                        <div className={styles.metaItem}>
                            <Star className={styles.starIcon} />
                            <span>{rating}</span>
                        </div>
                    </div>

                    {progress > 0 ? (
                        <div className={styles.progressSection}>
                            <div className={styles.progressHeader}>
                                <span className={styles.progressLabel}>Progress</span>
                                <span className={styles.progressValue}>{progress}%</span>
                            </div>
                            <Progress value={progress} className={styles.progressBar} />
                        </div>
                    ) : (
                        <Button className={styles.startButton}>
                            <Play className={styles.startButtonIcon} />
                            Start Course
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}