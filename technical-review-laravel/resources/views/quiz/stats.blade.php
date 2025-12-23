@extends('layouts.app')

@section('content')
    <!-- Statistics Screen -->
    <div id="statsScreen" class="screen active">
        <a href="{{ route('quiz.index') }}" class="btn btn-outline-secondary mb-3">
            <i class="bi bi-arrow-left me-1"></i>ホームへ
        </a>
        <div class="text-center mb-4">
            <h2 class="fw-bold"><i class="bi bi-graph-up me-2"></i>学習統計</h2>
        </div>
        
        <!-- Summary Cards -->
        <div class="row g-3 mb-4">
            <div class="col-md-3">
                <div class="card text-white bg-success shadow-sm">
                    <div class="card-body text-center">
                        <i class="bi bi-check-circle-fill fs-1"></i>
                        <h3 class="mt-2 mb-0">{{ $totalCorrect }}</h3>
                        <p class="mb-0">累計正解数</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-white bg-danger shadow-sm">
                    <div class="card-body text-center">
                        <i class="bi bi-x-circle-fill fs-1"></i>
                        <h3 class="mt-2 mb-0">{{ $totalIncorrect }}</h3>
                        <p class="mb-0">累計不正解数</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-white bg-info shadow-sm">
                    <div class="card-body text-center">
                        <i class="bi bi-pencil-square fs-1"></i>
                        <h3 class="mt-2 mb-0">{{ $totalLearning }}</h3>
                        <p class="mb-0 small">累計学習数</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-white bg-secondary shadow-sm">
                    <div class="card-body text-center">
                        <i class="bi bi-check-circle fs-1"></i>
                        <h3 class="mt-2 mb-0">{{ $completedQuestions }}</h3>
                        <p class="mb-0 small">完了問題数</p>
                        <p class="mb-0 mt-1"><small>{{ $completedPercentage }}%</small></p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Progress Overview -->
        <div class="card shadow-sm mb-4">
            <div class="card-header bg-white">
                <h5 class="mb-0"><i class="bi bi-bar-chart me-2"></i>学習進捗</h5>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <div class="d-flex justify-content-between mb-2">
                        <span>総問題数: <strong>{{ $totalQuestions }}</strong></span>
                    </div>
                    @php
                        $answeredButNotCompleted = ($answeredQuestionsCount ?? 0) - $completedQuestions;
                        $completedPercent = $totalQuestions > 0 ? round(($completedQuestions / $totalQuestions) * 100, 1) : 0;
                        $answeredPercent = $totalQuestions > 0 ? round(($answeredButNotCompleted / $totalQuestions) * 100, 1) : 0;
                        $unansweredPercent = $totalQuestions > 0 ? round(($unansweredQuestions / $totalQuestions) * 100, 1) : 0;
                    @endphp
                    <div class="progress" style="height: 30px;">
                        <div class="progress-bar bg-success" role="progressbar" 
                             style="width: {{ $completedPercent }}%"
                             title="完了: {{ $completedQuestions }}問 ({{ $completedPercent }}%)">
                            @if($completedPercent > 10)
                                完了 {{ $completedPercent }}%
                            @endif
                        </div>
                        <div class="progress-bar bg-warning" role="progressbar" 
                             style="width: {{ $answeredPercent }}%"
                             title="回答済（未完了）: {{ $answeredButNotCompleted }}問 ({{ $answeredPercent }}%)">
                            @if($answeredPercent > 10)
                                回答済 {{ $answeredPercent }}%
                            @endif
                        </div>
                        <div class="progress-bar bg-secondary" role="progressbar" 
                             style="width: {{ $unansweredPercent }}%"
                             title="未回答: {{ $unansweredQuestions }}問 ({{ $unansweredPercent }}%)">
                            @if($unansweredPercent > 10)
                                未回答 {{ $unansweredPercent }}%
                            @endif
                        </div>
                    </div>
                </div>
                <div class="row text-center mt-3">
                    <div class="col-4">
                        <small class="text-muted">完了</small>
                        <div><strong>{{ $completedQuestions }}</strong> 問</div>
                    </div>
                    <div class="col-4">
                        <small class="text-muted">回答済（未完了）</small>
                        <div><strong>{{ $answeredButNotCompleted }}</strong> 問</div>
                    </div>
                    <div class="col-4">
                        <small class="text-muted">未回答</small>
                        <div><strong>{{ $unansweredQuestions }}</strong> 問</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Completion Forecast -->
        @if($forecast && !$forecast['isCompleted'])
        <div class="card shadow-sm mb-4">
            <div class="card-header bg-white">
                <h5 class="mb-0"><i class="bi bi-calendar-check me-2"></i>学習完了予測</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <small class="text-muted">残り必要な正解数</small>
                            <h4 class="mb-0">{{ $forecast['remainingCorrect'] }} 回</h4>
                            <small class="text-muted">（現在 {{ $forecast['currentTotalCorrect'] }} / {{ $forecast['requiredTotalCorrect'] }} 回）</small>
                        </div>
                        <div class="mb-3">
                            <small class="text-muted">平均正解ペース（最近{{ $forecast['analyzedDays'] }}日間、学習日{{ $forecast['daysWithActivity'] }}日）</small>
                            <h4 class="mb-0">1日 {{ $forecast['averageDailyCorrect'] }} 回正解</h4>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <small class="text-muted">完了までの推定日数</small>
                            <h4 class="mb-0 text-primary">約 {{ $forecast['estimatedDays'] }} 日</h4>
                        </div>
                        <div class="mb-3">
                            <small class="text-muted">完了予定日</small>
                            <h4 class="mb-0 text-success">{{ date('Y年m月d日', strtotime($forecast['estimatedDate'])) }}</h4>
                        </div>
                    </div>
                </div>
                <div class="alert alert-info mb-0 mt-3">
                    <small><i class="bi bi-info-circle me-1"></i>この予測は最近の正解ペースに基づいています。各問題を完了させるには3回以上正解し、かつ正解数が不正解数を上回る必要があります。</small>
                </div>
                @if($targetDate)
                <div class="mt-3 pt-3 border-top">
                    <h6 class="mb-2">目標日との比較</h6>
                    @php
                        $targetDateTime = strtotime($targetDate);
                        $estimatedDateTime = strtotime($forecast['estimatedDate']);
                        $diffDays = (int) (($targetDateTime - $estimatedDateTime) / 86400);
                    @endphp
                    @if($diffDays > 0)
                        <div class="alert alert-success mb-0">
                            <i class="bi bi-check-circle me-1"></i>
                            目標日（{{ date('Y年m月d日', $targetDateTime) }}）まで<strong>{{ $diffDays }}日の余裕</strong>があります！現在のペースで達成可能です。
                        </div>
                    @elseif($diffDays < 0)
                        <div class="alert alert-warning mb-0">
                            <i class="bi bi-exclamation-triangle me-1"></i>
                            現在のペースでは目標日（{{ date('Y年m月d日', $targetDateTime) }}）より<strong>{{ abs($diffDays) }}日遅れる</strong>見込みです。学習ペースを上げる必要があります。
                        </div>
                    @else
                        <div class="alert alert-info mb-0">
                            <i class="bi bi-info-circle me-1"></i>
                            完了予定日が目標日（{{ date('Y年m月d日', $targetDateTime) }}）とぴったり一致しています！
                        </div>
                    @endif
                </div>
                @endif
            </div>
        </div>
        @elseif($forecast && $forecast['isCompleted'])
        <div class="card shadow-sm mb-4 border-success">
            <div class="card-body text-center">
                <i class="bi bi-trophy-fill text-success fs-1"></i>
                <h4 class="mt-3 text-success">🎉 おめでとうございます！全問題を完了するのに十分な正解数に達しました！</h4>
            </div>
        </div>
        @endif

        <!-- Daily Study Chart -->
        <div class="card shadow-sm mb-4">
            <div class="card-header bg-white">
                <h5 class="mb-0"><i class="bi bi-calendar3 me-2"></i>日ごとの学習状況</h5>
            </div>
            <div class="card-body">
                <canvas id="dailyChart" style="max-height: 400px;"></canvas>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script>
        // Chart data from PHP
        const chartData = {
            labels: @json($chartLabels),
            cumulativeLearning: @json($chartCumulativeLearning),
            cumulativeCorrect: @json($chartCumulativeCorrect),
            cumulativeIncorrect: @json($chartCumulativeIncorrect),
            dailyCorrect: @json($chartDailyCorrect),
            dailyIncorrect: @json($chartDailyIncorrect),
            dailyLearning: @json($chartDailyLearning)
        };

        // Initialize chart
        let statsChart = null;
        
        document.addEventListener('DOMContentLoaded', () => {
            const ctx = document.getElementById('dailyChart');
            if (!ctx) return;

            statsChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: '累計学習数',
                            data: chartData.cumulativeLearning,
                            borderColor: 'rgb(13, 110, 253)',
                            backgroundColor: 'rgba(13, 110, 253, 0.1)',
                            tension: 0.4,
                            fill: false
                        },
                        {
                            label: '累計正解数',
                            data: chartData.cumulativeCorrect,
                            borderColor: 'rgb(25, 135, 84)',
                            backgroundColor: 'rgba(25, 135, 84, 0.1)',
                            tension: 0.4,
                            fill: false
                        },
                        {
                            label: '累計不正解数',
                            data: chartData.cumulativeIncorrect,
                            borderColor: 'rgb(220, 53, 69)',
                            backgroundColor: 'rgba(220, 53, 69, 0.1)',
                            tension: 0.4,
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                afterBody: function(context) {
                                    const index = context[0].dataIndex;
                                    return [
                                        '',
                                        `当日学習数: ${chartData.dailyLearning[index]}`,
                                        `当日正解数: ${chartData.dailyCorrect[index]}`,
                                        `当日不正解数: ${chartData.dailyIncorrect[index]}`
                                    ];
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });

            // Reset button
            document.getElementById('resetStatsBtn')?.addEventListener('click', async () => {
                if (!confirm('本当に統計データをリセットしますか？この操作は取り消せません。')) {
                    return;
                }

                try {
                    const response = await fetch('/api/statistics/reset', {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                        }
                    });

                    if (response.ok) {
                        alert('統計データをリセットしました');
                        location.reload();
                    }
                } catch (error) {
                    console.error('Failed to reset statistics:', error);
                }
            });
        });
    </script>
@endpush
