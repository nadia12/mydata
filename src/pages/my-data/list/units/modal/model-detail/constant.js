export const MODEL_ACCURACY = {
  accuracy: {
    metric_name: 'Accuracy',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'a measure of statistical bias, as these cause a difference between a "prediction" value and a "true" value.'
  },
  r2: {
    metric_name: 'r2',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'a measure of how close the data are to the fitted regression line, also known as coefficient of determination.',
  },
  f1: {
    metric_name: 'F1',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'a measure that combines precision and recall is the harmonic mean of precision and recall.'
  },
  weightedPrecision: {
    metric_name: 'Weighted Prediction',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: '(also called precision or positive predictive value) is the fraction of relevant instances among the retrieved instances.'
  },
  weightedRecall: {
    metric_name: 'Weighted Recall',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: '(also known as sensitivity) is the fraction of relevant instances that have been retrieved over the total amount of relevant instances.'
  },
  silhouette: {
    metric_name: 'Silhouette',
    bottom_limit: -1,
    top_limit: 1,
    type: 'percentage',
    desc: 'a measure of how similar an object is to its own cluster (cohesion) compared to other clusters (separation).'
  },
  rmse: {
    metric_name: 'RMSE (Root Mean Squared Error)',
    bottom_limit: 0,
    top_limit: '∞',
    type: 'notPercentage',
    desc: 'a frequently used measure of the differences between values (sample or population values) predicted by a model or an estimator and the values observed.'
  },
  mse: {
    metric_name: 'MSE (Mean Squared Error)',
    bottom_limit: 0,
    top_limit: '∞',
    type: 'notPercentage',
    desc: 'a measures the average of the squares of the errors—that is, the average squared difference between the estimated values and what is estimated.'
  },
  mae: {
    metric_name: 'MAE (Mean Absolute Error)',
    bottom_limit: 0,
    top_limit: '∞',
    type: 'notPercentage',
    desc: 'a measures the average magnitude of the errors in a set of predictions, without considering their direction.'
  },
  areaUnderROC: {
    metric_name: 'AreaUnderROC',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'Receiver Operating Characteristic Area Under Curve (ROC AUC) is plotting True Positive Rate (TPR) against False Positive Rate (FPR)'
  },
  areaUnderPR: {
    metric_name: 'AreaUnderPR',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'Precision Recall Area Under Curve (PR AUC) is plotting Precision against Recall.'
  }
}

