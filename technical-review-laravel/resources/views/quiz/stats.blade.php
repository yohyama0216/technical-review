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
