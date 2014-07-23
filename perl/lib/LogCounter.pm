package LogCounter;
use strict;
use warnings;

sub new {
  my ($class, $logs) = @_;
  return bless { logs => $logs }, $class;
};

sub group_by_user {
  my $self = shift;
  my $result = {};

  for my $log (@{$self->{logs}}) {
    my $user = ($log->{user})? $log->{user} : "guest";
    if (!$result->{$user}) { $result->{$user} = []; }
    push($result->{$user}, $log);
  }

  return $result;
}

sub count_error {
  my $self = shift;
  my $result = 0;

  for my $log (@{$self->{logs}}) {
    if ($log->{status} =~ /^5\d{2}$/) {
      $result++;
    }
  }

  return $result;
}

1;
