import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const BentoMetrics = ({
  todayCount,
  overdueCount,
  allCount,
}: {
  todayCount: number;
  overdueCount: number;
  allCount: number;
}) => {
  return (
    <div className="flex-col-center gap-2">
      <div className="flex gap-3">
        <Card className="bg-primary w-40 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>
              <span className="text-sm text-primary-foreground">
                Today's Errands
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-end">
            <span className="text-4xl text-primary-foreground">
              {todayCount}
            </span>
          </CardContent>
        </Card>
        <Card className="bg-primary w-40 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>
              <span className="text-sm text-primary-foreground">
                Overdue Errands
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-end">
            <span className="text-4xl text-primary-foreground">
              {overdueCount}
            </span>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-secondary w-full flex justify-between">
        <CardHeader>
          <CardTitle>
            <span className="text-sm text-secondary-foreground">All Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-end">
          <span className="text-4xl text-secondary-foreground">{allCount}</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default BentoMetrics;
